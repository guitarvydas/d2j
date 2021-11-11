:- consult(fb).

:- use_module(library(http/json)).

%% allDiagramIDs(IDs):-
%%     bagof(ID,fact(diagram,ID,_),IDs).

%% childrenOf(Diagram,Children):-
%%     bagof(Child,fact(contains,Diagram,Child),Children).

relationOf(Diagram,Rel,Child,Obj):-
    fact(diagram,Diagram,_),fact(contains,Diagram,Child),fact(Rel,Child,Obj).

elementOf(Diagram,Element):-
    relationOf(Diagram,Rel,Child,Obj),
    Element = element{relation:Rel,subject:Child,object:Obj}.

%% % bagof(E,elementOf(D,E),Ebag).
%% % bagof(E,elementOf(D,E),Ebag),json_write(user_output,[D,Ebag]).

%% %% junk:-
%% %%     forall(fact(diagram,D,_),
%% %% 	   jwrite(D)).

%% %% jwrite(D):-
%% %%     bagof(E,elementOf(D,E),Ebag),json_write(user_output,[D,Ebag]).

	   
diagramElements(D,DE):-
    bagof(E,elementOf(D,E),Ebag),
    DE = drawing{id:D,elements:Ebag}.
	   
% diagramElements(D,DEbag),json_write(user_output,DEbag).
singleDiagram(S):-
    bagof(DE,diagramElements(_,DE),S).

% bagof(S,singleDiagram(S),SBag).

% bagof(S,singleDiagram(S),SBag),json_write(user_output,SBag).

pall:-
    bagof(S,singleDiagram(S),SBag),json_write(user_output,SBag).
