#include <iostream>

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
        cout << maxLength <<endl;

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
    string encrypt2(string plainText,int numRails) {
/*        string cipherText = "";
        plainText = removeWhiteSpace(plainText);


        for ( int i = 0; i < numRails; i++) {
            int max
            for (int j = 0; j < maxLength; j++ ) {
                if( ( j*numRails + i) < plainText.length() )
                    cipherText += plainText[j*numRails + i];
                else
                    cipherText += '*';

            }
        }
        return cipherText; */
    }


    /**
    * decrypt2 - Decrypt text using diagonal rails method.
    *
    * @param {string} cipherText - The text to be decrypted
    * @param {int} rails - Number of Rails
    * @return {string} - Decoded Text
    */
    string decrypt2(string cipherText,int rails) {
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
    int rails = 3;
    string message = "HE IS MOST WANTED CRIMINAL";
    string cipher1 =  r.encrypt1(message,rails);
    string decrypt1 =  r.decrypt1(cipher1,rails);
    cout << "Message: " << message << endl << "Rails: " << rails <<  endl << "Encrypt1: " << cipher1 << endl
    << "Decrypt1: " << decrypt1 << endl;

    return 0;
}
