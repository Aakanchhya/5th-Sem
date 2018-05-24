#include <iostream>

using namespace std;

class ChemicalEQN
{
  public:
    ChemicalEQN(float c1, float c2, float c3, float k1, float k2, float delta, float time)
    {
        amount1[0] = c1;
        amount2[0] = c2;
        amount3[0] = c3;
        k1 = k1;
        k2 = k2;
        delT = delta;
        time = time;
    }
    void calcAmt();

  private:
    float amount1[100], amount2[100], amount3[100], k1, k2, delT, time;
};

void ChemicalEQN::calcAmt()
{
    cout << amount2;
    float t = 0.0;
    cout << endl
         << "Time \t \t C1 \t \t C2 \t \t C3" << endl;
    for (int i = 0; t <= time; i++)
    {
        cout << t << "\t" << amount1 << "\t" << amount2 << "\t" << amount3 << endl;
        amount1[i + 1] = amount1[i] + (k2 * amount3[i] - k1 * amount1[i] * amount2[i]) * delT;
        amount2[i + 1] = amount2[i] + (k2 * amount3[i] - k1 * amount1[i] * amount2[i]) * delT;
        amount3[i + 1] = amount3[i] + 2.0 * (k1 * amount1[i] * amount2[i] - k2 * amount3[i]) * delT;
        t = t + delT;
    }
}

int main()
{
    ChemicalEQN CE(50.0, 25.0, 0.0, 0.025, 0.01, 0.1, 5.0);
    CE.calcAmt();
    return 0;
}
