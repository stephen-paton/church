# Church
Here's the thing...

[Lisp](https://lisp-lang.org/) is, unironically, the answer to the question "How do you design a **scaleable** programming language", in the sense of facilitating recursively expanding complexity without syntax bloat - [Rust](https://rust-lang.org/), [C++](https://isocpp.org/), etc.

The problem is... it is [ugly as all hell](https://dersavage.github.io/main/tutorials/why-lisp-is-horrible/):
```lisp
(define (leap-year? year)
  (if (or (not (zero? (remainder year 4)))
          (and (zero? (remainder year 100))
               (not (zero? (remainder year 400)))))
      #f
      #t))

(define (days-since year month day)
  
  (define month-days (list 31 28 31 30 31 30 31 31 30 31 30 31))
  
  (let ((total-days (* (1- year) 365)))
    
    (set! total-days (+ total-days (quotient (1- year) 4)))
    (set! total-days (- total-days (quotient (1- year) 100)))
    (set! total-days (+ total-days (quotient (1- year) 400)))
   
    (do ((i 0 (add1 i)))
        ((= i (1- month)) total-days)
      (set! total-days (+ total-days (list-ref month-days i))))
    
    (if (and (leap-year? year) (> month 2))
        (set! total-days (add1 total-days)))
    (set! total-days (+ total-days day))
    total-days))
```

The other problem is, it's far too syntactically permissive, as in, it's really easy to overload built-in functions, variables, etc. because they're not namespaced or visually distinct from user-defined ones (though this is a problem pervasive to pretty much every programming language).

But, it is **right** about structure.

This is where `Church` comes in.

Following in the footsteps of languages like [Haskell](https://www.haskell.org/) and [Ada](https://www.adaic.org/), `Church` is named for a key figure in the history of computer science - [Alonzo Church](https://courses.cs.washington.edu/courses/cse505/23wi/notes/notes/week07/) - whose work on lambda calculus directly inspired the design of languages like [Lisp](https://lisp-lang.org/), which itself, inspired `Church` - turtles all the way down.

Anyway, the core idea of `Church` is a simple one:

> [Lisp](https://lisp-lang.org/), but gramatically **stricter**

Meaning:
- Variables must be statically typed
- No grammar-defying shorthand like `'(1 2 3 4)` versus `(list 1 2 3 4)`
- Each distinct *thing* has a particular syntax associated with it

I suppose the biggest departure from [Lisp](https://lisp-lang.org/) is that `Church` distinguishes data lists `[x, y, z]` from operator-driven ones `(#operator, x, y, z)`, which helps break up the otherwise endless `((()))`, in addition to providing clarity of purpose:
```church
(#import fmt `std:fmt`)
(#proc ~hello_world [] [
	(#call fmt:~print_ln `Hello, World!`)
])
(#call ~hello_world [])
```

The language is very much still at the proof of concept stage, but so far I've settled on the following:
- `_enum_value`
- `local_variable`
- `$global_variable`
- `CONSTANT`
- `$GLOBAL_CONSTANT`
- `'type`
- `#operator`
- `~procedure`
- `@macro`
- `namespace:`

The core philosophy driving the design of `Church` is **syntactic consistency**, meaning that each distinct *thing*, should apply universally.

Though I confess that I enjoy programming in languages that look more like this:
```casper
import std::fmt

hello_world : fn = () => nil {
	fmt.print_ln(`Hello, World!`)
	-> nil
}
```

It cannot be denied that the grammatical consistency and simplicity of the [Lisp](https://lisp-lang.org/) approach, which itself mirrors the structure of assembly, is the logically correct way to go, because the language itself effectively becomes **the AST** that it would parse to, and the grammar is so logically consistent, that the parser itself becomes child's play to write, because there's really just two structures to recursively parse in the case of `Church` and amazingly, just one in the case of [Lisp](https://lisp-lang.org/) (at the cost of parenthesis fatigue).
