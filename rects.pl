:- consult(fb).

rect(ID):-
    fact(cell,ID,_),
    \+fact(kind,ID,"ellipse"),
    \+fact(edge,ID,_),
    \+fact(kind,ID,"text").
    
printRects:-
    forall(rect(ID),printRect(ID)).

printRect(ID):-
    format("fact(rect, ~w, \"\").~n",[ID]).
