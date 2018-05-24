male(ram).
male(hari).
male(ganesh).
male(sandesh).
male(bikash).
male(ramesh).

female(rita).
female(sita).
female(laxmi).
female(gita).

parent_of(ram,rita).
parent_of(sita,rita).
parent_of(ram,laxmi).
parent_of(sita,laxmi).
parent_of(rita,sandesh).
parent_of(ganesh,sandesh).
parent_of(laxmi,bikash).
parent_of(ramesh,bikash).
parent_of(hari,ramesh).
parent_of(gita,ramesh).

father_of(X,Y):- male(X),parent_of(X,Y).
mother_of(X,Y):- female(X),parent_of(X,Y).

sister_of(X,Y):- female(X),parent_of(Z,X),parent_of(Z,Y),not(X = Y).
grandfather_of(X,Y):- male(X),parent_of(Z,Y),father_of(X,Z).
grandmother_of(X,Y):- female(X),parent_of(Z,Y),mother_of(X,Z).

aunt_of(X,Y):- mother_of(Z,Y),sister_of(Z,X).



