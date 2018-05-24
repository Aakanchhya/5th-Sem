#include <iostream>
 
float calculateC() {

}
int main() {
    float G[4] =  {3.2,4.1,5,5.5};

    float y_1 = 17.1;

    for(int i = 0; i < 4; i++) {
        float I = 2 + 0.1 * y_1;
        float Y = 45.45  + 2.27 * (I + G[i]);
        y_1 = Y;
        float T = 0.2 * Y;
        if(i == 3) {
        float C = 20 + 0.7 * (Y - T);

        std::cout << "Year  " << i + 1 << "C: " << C << std::endl;
        }
    }
    return 0;
}