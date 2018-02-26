#include <iostream>
#include <conio.h>
using namespace std;


class RailFetch {

public:
    /**
    * encrypt1 - Encrypts text using vertical rails method.
    *
    * @param {string} plainText - The text to be encrypted
    * @param {int} numRails - Number of Rails
    * @return {string} - Cipher Text
    */
    string encrypt1(string plainText,int numRails) {
        string cipherText = "";
        plainText = removeWhiteSpace(plainText);
        int maxLength = plainText.length() / numRails +  (plainText.length() % numRails == 0 ? 0: 1 );


        for ( int i = 0; i < numRails; i++) {
            for (int j = 0; j < maxLength; j++ ) {
                if( ( j*numRails + i) < plainText.length() )
                    cipherText += plainText[j*numRails + i];
                else
                    cipherText += '*';
            }
        }
        return cipherText;
    }


    /**
    * decrypt1 - Decrypt text using vertical rails method.
    *
    * @param {string} cipherText - The text to be decrypted
    * @param {int} rails - Number of Rails
    * @return {string} - Decoded Text
    */
    string decrypt1(string cipherText,int rails) {
        string decoded = "";
        int key = cipherText.length() / rails;

        for (int i= 0; i < key; i++ ){
            for(int j = 0; j < rails; j++ ){
                if( ( j*key + i) < cipherText.length() )
                    decoded += cipherText[j*key + i];
            }
        }
        return decoded;
    }


    /**
    * encrypt2 - Encrypts text using Diagonal rails method.
    *
    * @param {string} plainText - The text to be encrypted
    * @param {int} numRails - Number of Rails
    * @return {string} - Cipher Text
    */


    /**
    * decrypt2 - Decrypt text using diagonal rails method.
    *
    * @param {string} cipherText - The text to be decrypted
    * @param {int} rails - Number of Rails
    * @return {string} - Decoded Text
    */
    string decrypt2(string cipherText,int rails) {
        string decoded = "";

        for (unsigned int i = 0; i < cipherText.length(); i++) {
            decoded+="*";
        }
        int rails_1 = rails-1;
        unsigned int clen = 0;
        for (int i= 0; i < rails; i++ ){
            unsigned int length = i;
            int up = true;
            do {
                decoded[length] = cipherText[clen++];
                if( (i % (rails-1)) ) {
                    up = !up;

                    if(up) {
                        length += ( rails_1 -  ((rails_1-i) % (rails_1))   ) *2;
                    } else {
                        length += ( rails_1 - (i % (rails_1) )) *2;
                    }
                } else {
                    length += ( rails_1 - (i % (rails_1) )) *2;
                }
            } while(length < cipherText.length());
        }
        return decoded;
    }

    string encrypt2(string plainText,int rails) {
        string cipherText = "";

        for (unsigned int i = 0; i < plainText.length(); i++) {
            cipherText +="*";
        }
        int rails_1 = rails-1;
        unsigned int clen = 0;
        for (int i= 0; i < rails; i++ ){
            unsigned int length = i;
            int up = true;
            do {
                cipherText[clen++] = plainText[length];
                if( (i % (rails-1)) ) {
                    up = !up;

                    if(up) {
                        length += ( rails_1 -  ((rails_1-i) % (rails_1))   ) *2;
                    } else {
                        length += ( rails_1 - (i % (rails_1) )) *2;
                    }
                } else {
                    length += ( rails_1 - (i % (rails_1) )) *2;
                }
            } while(length < plainText.length());
        }
        return cipherText;
    }


    //Return String with white space removed
    string removeWhiteSpace(string text) {
        string removed = "";
        for (unsigned int i = 0; i < text.length(); i++) {
            if(text[i] == ' ' || text[i] == '\t' || text[i] == '\n' || text[i] == '\r' )
                continue;
            removed += text[i];
        }
        return removed;
    }

};


int main()
{
    RailFetch r;
    int rails = 4;
    string message = "HEISMOSTWANTEDCRIMINAL";

    string cipher1 =  r.encrypt1(message,rails);
    string decrypt1 =  r.decrypt1(cipher1,rails);

    string cipher2 =  r.encrypt2(message,rails);
    string decrypt2 =  r.decrypt2(cipher2,rails);

    cout << "Message: " << message << endl << "Rails: " << rails <<  endl << endl << "Encrypt1: " << cipher1 << endl
    << "Decrypt1: " << decrypt1 << endl << endl << "Encrypt2: " << cipher2 << endl
    << "Decrypt2: " << decrypt2 << endl;

    //cout << r.encrypt3("THEYWILLATTACKONTOMORROW");

    return 0;
}
