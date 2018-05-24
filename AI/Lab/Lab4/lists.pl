member(X, [X|_]).
member(X,[_|T]):- member(X,T).

equal([],[]).
equal([X|T1],[X|T2]):- equal(T1,T2).