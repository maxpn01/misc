#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <ctime>
#include <cctype>
#include <stdlib.h>

using std::cout;
using std::cin;
using std::endl;
using std::vector;
using std::string;

int main()
{
	const int MAX_GUESSES = 10;
	vector<string> words = { "WORD", "POIGNANT", "BLOB", "DELINQUENT", "PREPOSTEROUS"};

	srand(static_cast<unsigned int>(time(0)));
	random_shuffle(words.begin(), words.end());

	const string SECRET_WORD = words[0];
	int wrong_guesses = 0;
	string word_progress(SECRET_WORD.size(), '-');
	string used_letters = "";

	cout << "Welcome to Hangman. Good luck!\n";
	cout << "PS: I hope you make it :) being hanged is terrible, i think";

	while ((wrong_guesses < MAX_GUESSES) && (word_progress != SECRET_WORD))
	{
		cout << "\n\n* Guesses left: " << (MAX_GUESSES - wrong_guesses);
		cout << "\n* Used letters: " << used_letters;
		cout << "\n* Word " << word_progress;

		char guess;
		cout << "\n\nEnter your guess: ";
		cin >> guess;
		guess = toupper(guess);
		
		while (used_letters.find(guess) != string::npos)
		{
			cout << "\nYou've already guessed " << guess << endl;
			cout << "Enter your guess: ";
			cin >> guess;
			guess = toupper(guess);
		}

		used_letters += guess;

		if (SECRET_WORD.find(guess) != string::npos)
		{
			cout << "YAS! " << guess << " is in the word.";

			for (unsigned int i = 0; i < SECRET_WORD.length(); i++)
			{
				if (SECRET_WORD[i] == guess)
					word_progress[i] = guess;
			}
		}
		else 
		{
			cout << "I'm very VERY sorry ... " << guess << " isn't in the word.";
			wrong_guesses++;
		}
	}

	if (wrong_guesses == MAX_GUESSES)
		cout << "\nYou've been hanged!!! uaHAHAHAHA";
	else
		cout << "\n\nWoah OwO you actually did it! Congrats, you lil lucky monkey -_-";

	cout << "\nDA WORD: " << SECRET_WORD << "\n\n";

	system("pause");
}