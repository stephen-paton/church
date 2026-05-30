# `church`
## What's with the name `church`?
Following in the footsteps of languages like [Haskell](https://www.haskell.org/) and [Ada](https://www.adaic.org/), `church` is named for a key figure in the history of computer science - [Alonzo Church](https://courses.cs.washington.edu/courses/cse505/23wi/notes/notes/week07/) - whose work on λ-calculus directly inspired the design of languages like [Lisp](https://lisp-lang.org/), which itself inspired the grammar of **this** language, so the name `church` felt fitting.

## Why `church`?
Here's the thing...

[Lisp](https://lisp-lang.org/) is, unironically, the answer to the question:
> "How do you design a **scaleable** programming language"

By **scaleable**, I mean that the ground-floor grammar of the language is such, that it enables turtles atop turtles atop turtles of complexity, without the need to introduce new grammatical rules as new ideas about *how* one should write code, emerge:
```js
// so many ways to write the same loop
for (var i = 0; i < 10; i++) { /*...*/ }

for (let i = 0; i < 10; i++) { /*...*/ }

for (const i = 0; i < 10; i++) { /*...*/ }

for (const i of Array.from(Array(10).keys())) { /*...*/ }

// so many ways to write the same if/else
let name;

if (true) {
	name = 'Matilda';
} else {
	name = 'Jasper';
}

name = true ? 'Matilda' : 'Jasper';

switch (true) {
	case true:
		name = 'Matilda';
		break;
	case false:
		name = 'Jasper';
		break;
}
```

If you *really* want to see how **bad** things can get in this regard, go spend some time with [Rust](https://rust-lang.org/) or [C++](https://isocpp.org/).

So, how does one avoid this seemingly unavoidable problem of ever-expanding grammatical complexity?

Simple, you establish a **recursive** grammar rule, that enables one to express any idea in code.

Do that as succinctly as possible, and you get [Lisp](https://lisp-lang.org/):
```lisp
(operator ...args)
```

Seriously, that one rule really can be used to express **any** idea in code:
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

And, because **anything** can be expressed with it, there's never a need to add a new grammar rule to allow the language to express a new idea, regardless of how things progress in the field of computer science.

The elephant in the room - of course - is that all of those parentheses make the language [far less readable](https://dersavage.github.io/main/tutorials/why-lisp-is-horrible/) than languages like [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [Zig](https://ziglang.org/).

This was the core impetus for making `church`, as, though I grasped the paradigm shift that [Lisp](https://lisp-lang.org/)'s structure is (see [Let Over Lambda](https://letoverlambda.com/)), I just didn't like the actual **syntax** of it, and so, I wanted to try my hand at making a grammar that embraced that simple structural foundation of [Lisp](https://lisp-lang.org/) - `(operator ...args)` - with internal grammar that better denoted the purpose of each language token.

For example, it's always annoyed me with programming languages, that a keyword like `if`, `else`, `true`, `false`, exists within the same context as a variable name like `hello` or `world`, and within the same context as a numeric literal like `123` or `0b1111_0100`.

With `church` the intention is to design the simplest possible grammar for expressing all of these things in such a way that purpose is **ubiquitous**.

Taking that idea to its ultimate conclusion, I've landed on the following three **structural** elements:
- `{...}` - A scalar value e.g. `{Hello, World!}` or `{1000_0100}`
- `[...args]` - A list of data e.g. `[{1} {2} {3}]`
- `(#operator ...args)` - A list that **does** something e.g. `(#call fmt:~print_ln [{Hello, World!}])`

And the following **identifier** types:
- `_enum_option` e.g, `_Vertical`
- `local_variable` e.g. `name`
- `CONSTANT` e.g. `NAME`
- `'type` e.g. `'string`
- `#operator` e.g. `#enum`
- `~procedure` e.g. `~flip_bit`
- `@macro` e.g. `@inline_for`
- `namespace:` e.g. `fmt:`

*If* globals were allowed then they'd have the following syntax:
- `$global_variable` e.g. `$name`
- `$GLOBAL_CONSTANT` e.g. `$NAME`

However, having seen the light of **namespace prefixes** via [Odin](https://odin-lang.org/), I feel that globals are an anti-pattern not worth enabling, as `(#import rt: {path/to/root})` and `rt:static_var` enable equivalent behaviour, without ever needing to wonder where the hell something in a program/library was defined, and where it's being used/updated.

Ultimately, the **aim** is to make `church` self-compiling, which is to say, for the lowest-level of the language to be the output grammar of a compile target.

For example, if you're compiling for `gbz80`, then it might look something like:
```church
(#call gbz80:@adc__a__r8 _d)
```

Which would then emit:
```church
{8A}
```

The idea basically being, because `church`'s syntax style mirrors that of low-level assembly languages - `operator ...args` - it has the capacity to directly represent them in-language, though in mirroring the recursive nature of [Lisp](https://lisp-lang.org/), the end-user of the language would typically be using it at a much higher level of abstraction - `(#call ~hello_world [])`...
