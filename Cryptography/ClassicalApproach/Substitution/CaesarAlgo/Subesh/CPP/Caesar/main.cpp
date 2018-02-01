
#include <iostream>
#include <fstream>
#include <stdlib.h>
using namespace std;

class Caesar {
public:

    string encrypt(string text,int key) {
        string encoded = "";
        for(int i = 0; i < text.length(); i ++ ) {
            if(text[i] != ' ')
            encoded += (text[i] - 97 + key) % 26 + 97;
            else
                encoded += " ";

        }

        return encoded;
    }
    string decrypt(string text,int key) {
        string decoded = "";
        for(int i = 0; i < text.length(); i ++ ) {
            if(text[i] != ' ')
                decoded += abs((26 + text[i] - 97 - key)) % 26 + 97;
            else
                decoded += " ";

        }

        return decoded;
    }

};


int main()
{
    int key = 25;
    Caesar *s = new Caesar;
    string plaintText = "sdsd";
    string cipherText = s->encrypt(plaintText, key);
    string decodedText = s->decrypt(cipherText, key);
    cout << "Plain Text: " << plaintText << endl;
    cout << "Key: " << key << endl;

    cout << "Encoded Text: " << cipherText << endl;
    cout << "Decoded Text: " << decodedText << endl;

    return 0;
}
