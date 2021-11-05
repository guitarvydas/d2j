:- consult(fb).
:- use_module(library(http/json)).

diagrams(D):-
    bagof(Diagram,triple(diagram,Diagram,_),D).

