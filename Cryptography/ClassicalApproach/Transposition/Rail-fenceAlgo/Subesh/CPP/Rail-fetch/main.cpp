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
        plainText = removeWhiteSpace(plainText);
        int length = plainText.length();
        int inc = 1;
        int row = -1;
        string cipher = "";

        string rowContent[100];

        for(int i =0; i < numRails; i++) {
            rowContent[i] = "";
        }

        for(int i = 0;i < length; i++) {
            if(row  == 0) {
                inc = 1;
            }
            else if(row == numRails-1 ) {
                inc = -1;
            }
            row += inc;
            rowContent[row] += plainText[i];
            cout << row;

        }
        if(row != 0 && row != (numRails-1) ) {
            do {
                     row += inc;
                rowContent[row] += '*';

            }while(row != 0 && row != (numRails-1) );
        }

        for(int i =0; i < numRails; i++) {
            cipher += rowContent[i] ;
        }
        //cout << cipher;
        return cipher;

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

    string daigonalEncrypt(string sym, int number)
{
    cout << "I am inside diagonal Encryption" << endl ;
    string symbol = removeWhiteSpace(sym);
    string cipher[100];
    for(int i=0; i<100; i++)
    {
        cipher[i] = "";
    }

    string cipherText = "";

    //Looping to get cipher text
    int row = 0;
    int count = 0;

    for(int column=0; column<symbol.length(); column++)
    {
        cout << endl << "I am inside i loop: column = " << column << endl ;
        if(count < number)
        {
            cout << endl << "Inside if";
            cipher[row] += symbol[column];
            cout << endl << "cipher = " << cipher[row] ;
            cout << endl << "row = " << row << endl ;
            row++;
            count++;
        }
        else
        {
            if(row == number)
            {
                row--;
            }
            cout << endl << "Inside else";
            row--;
            cipher[row] += symbol[column];
            cout << endl << "cipher = " << cipher[row] ;
            cout << endl << "row = " << row << endl;
            count ++;
            if(row == 0)
            {
                count =1;
                row = 1;
            }
        }
    }

    cout << row ;

    //For extra symbol
    for(int i=0; i<row; i++)
    {
        row ++;
        cipher[row] += '*';
    }

    //Concatinating strings
    for(int i=0; i<number; i++)
    {
        cipherText += cipher[i];
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
    int rails = 3;
    string message = "HEISMOSTWANTEDCRIMINAL";
    string cipher1 =  r.daigonalEncrypt(message,rails);
    string decrypt1 =  r.decrypt1(cipher1,rails);
    cout << "Message: " << message << endl << "Rails: " << rails <<  endl << "Encrypt1: " << cipher1 << endl
    << "Decrypt1: " << decrypt1 << endl;

    return 0;
}
