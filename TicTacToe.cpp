#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <stdlib.h>
#include <cctype>

using namespace std;

inline bool is_valid_move(const vector<char>& board, int move);
inline char opponent(char& piece);
int computer_move(vector<char> board, char computer);
int prompt_game_v();
char prompt_player_piece();
int prompt_move(const char& player, const bool& computer);
bool prompt_continue_game();
inline void mark_cell(const int& p_move, const char& p_mark);
void display_board();
void display_score_board();
void display_boards();
void clear_board();
void display_winner(const char& player, const char& computer, const bool& game_v_2);
bool check_win_for(const char& player);
bool check_winners(const char& player);
bool check_board_full();

const char X = 'X';
const char O = 'O';
const char _ = ' ';
int Draws = 0, XWon = 0, OWon = 0;
vector<char> board(9, _);

int main()
{
	cout << "Welcome to the \"hello-world\" of games: Tic-Tac-Toe.\n";
	
	int game_v = prompt_game_v();

	if (game_v == 1)
	{
		char turn = X;

		while (1)
		{
			display_boards();

			mark_cell(prompt_move(turn, 0), turn);

			if (check_winners(turn))
			{
				display_winner(turn, _, 0);
				if (!prompt_continue_game()) break;
			}

			turn = opponent(turn);
		}
	}
	else if (game_v == 2)
	{
		//int move;

		char player = prompt_player_piece();
		char computer = opponent(player);
		char turn = X;

		while (!check_win_for(player) || !check_win_for(computer))
		{
			display_boards();

			if (turn == player)
				mark_cell(prompt_move(player, 1), player);
			else
				mark_cell(computer_move(board, computer), computer);

			if (check_winners(turn))
			{
				display_winner(player, computer, 1);
				if (!prompt_continue_game()) break;
			}

			turn = opponent(turn);
		}
	}

	system("pause");
}

inline bool is_valid_move(const vector<char>& board, int move)
{
	return (board[move] == _);
}

inline char opponent(char& piece)
{
	return piece == X ? O : X;
}

int computer_move(vector<char> board, char computer)
{
	unsigned int move = 0;
	bool found = false;

	// 1. Making winning move
	while (!found && move < board.size())
	{
		if (is_valid_move(board, move))
		{
			board[move] = computer;
			found = check_win_for(computer);
			board[move] = _;
		}

		if (!found)
			move++;
	}

	// 2. Blocking the player on their next winning move
	if (!found)
	{
		move = 0;
		char player = opponent(computer);

		while (!found && move < board.size())
		{
			if (is_valid_move(board, move))
			{
				board[move] = player;
				found = check_win_for(player);
				board[move] = _;
			}

			if (!found)
				move++;
		}
	}

	// 3. Take the best remaining moves (center -> corners -> rest)
	if (!found)
	{
		move = 0;
		unsigned int i = 0;

		const int BEST_MOVES[] = { 4, 0, 2, 6, 8, 1, 3, 5, 7 };

		while (!found && i < board.size())
		{
			move = BEST_MOVES[i];

			if (is_valid_move(board, move))
			{
				found = true;
			}

			i++;
		}
	}

	cout << "\nI shall take square number " << move << endl;

	return move;
}

/********* PROMPTS *********/

int prompt_game_v()
{
	int choice;

	cout << "\n1. Player vs Player\n";
	cout << "2. Player vs Computer\n";
	cout << "\n[1, 2]: ";
	cin >> choice;

	return choice;
}

char prompt_player_piece()
{
	char go_first;

	while (1)
	{
		cout << "Do you require the first move? (y/n) ";
		cin >> go_first;

		if (go_first == 'y')
		{
			cout << "\nThen take the first move. You will need it.\n";
			return X;
		}
		else if (go_first == 'n')
		{
			cout << "\nYour bravery will be your undoing ... I will go first.\n";
			return O;
		}
		else
		{
			cout << "Invalid choice!\n";
			continue;
		}
	}
}

int prompt_move(const char& player, const bool& computer) {
	unsigned int cell_index;
		
	cout << "\n[0-8] " << static_cast<char>(tolower(player)) << " ";
	cin >> cell_index;

	if (!cin)
	{
		cout << "Invalid Type. " << endl;
		cin.clear();
		cin.ignore(numeric_limits<streamsize>::max(), '\n');
	}

	while (!is_valid_move(board, cell_index) && (cell_index > 8 || cell_index < 0))
	{
		cout << "Invalid move!";

		if (computer)
			cout << "\nThat square is already occupied, foolish human.\n";
		
		cout << "\n[0-8] " << static_cast<char>(tolower(player)) << " ";
		cin >> cell_index;
	}

	return cell_index;
}

bool prompt_continue_game() {
	char choice;
	
	while (1) {
		
		cout << "\nDo you wish to continue? (y/n) ";
		cin >> choice;
		cout << "\n";

		if (choice == 'y') return 1;
		else if (choice == 'n') return 0;
		else 
		{
			cout << "Invalid choice!";
			continue;
		}
	}
}

inline void mark_cell(const int& p_move, const char& p_mark) {
	board[p_move] = p_mark;
}

/********* DISPLAY ELEMENTS *********/

void display_board()
{
	cout << "\n\t| " << board[0] << " | " << board[1] << " | " << board[2] << " |";
	cout << "\n\t" << "-------------";
	cout << "\n\t| " << board[3] << " | " << board[4] << " | " << board[5] << " |";
	cout << "\n\t" << "-------------";
	cout << "\n\t| " << board[6] << " | " << board[7] << " | " << board[8] << " |";
	cout << "\n\n";
}

void display_score_board()
{
	cout << "x: " << XWon << "\n";
	cout << "draws: " << Draws << "\n";
	cout << "o: " << OWon << "\n";
}

void display_boards()
{
	display_board();
	display_score_board();
}

void clear_board()
{
	for (unsigned int i = 0; i < board.size(); i++)
		board[i] = _;
}

void display_winner(const char& player, const char& computer, const bool& game_v_2)
{
	if (check_win_for(computer))
	{
		cout << "\n" << computer << " won!\n\n";
		
		if (game_v_2)
		{
			cout << "As I predicted, human, I am triumphant once more -- proof\n";
			cout << "that computers are superior to humans in all regards.\n";
		}
	}
	else if (check_win_for(player))
	{
		cout << "\n" << player << " won!\n\n";
		
		if (game_v_2)
		{
			cout << "No, no! It cannot be! Somehow you tricked me, human.\n";
			cout << "But never again! I, the AI, so swear it!\n";
		}
	}
	else if (check_board_full())
	{
		cout << "\n" << "It's a draw!\n\n";

		if (game_v_2)
		{
			cout << "You were most lucky, human, and somehow managed to tie me.\n";
			cout << "Celebrate .. for this is the best you will ever achieve.\n";
		}
	}	

	display_boards();
	clear_board();
}

/********* END GAME *********/

bool check_win_for(const char& player) 
{
	// Rows
	if (board[0] == player && board[1] == player && board[2] == player) return 1;
	if (board[3] == player && board[4] == player && board[5] == player) return 1;
	if (board[6] == player && board[7] == player && board[8] == player) return 1;

	// Columns
	if (board[0] == player && board[3] == player && board[6] == player) return 1;
	if (board[1] == player && board[4] == player && board[7] == player) return 1;
	if (board[2] == player && board[5] == player && board[8] == player) return 1;

	// Diagonals
	if (board[0] == player && board[4] == player && board[8] == player) return 1;
	if (board[2] == player && board[4] == player && board[6] == player) return 1;

	return 0;
}

bool check_winners(const char& player) 
{
	if (check_win_for(player)) {
		if (player == X) XWon++;
		if (player == O) OWon++;
		return 1;
	}
	if (check_board_full()) {
		Draws++;
		return 1;
	}

	return 0;
}

bool check_board_full() 
{
	for (unsigned int i = 0; i < board.size(); i++)
		if (board[i] == _) return 0;

	return 1;
}