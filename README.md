# Comparison of reactive experiment to knockout

Install dependencies with `npm install` first.

In each example a graph of pure computeds is derived from an observable at the
root of the graph. A subscription is set up to watch the value at the end of
graph, and all calls to re-evaluate computeds are counted. The observable at
the root is then updated, with all values at the end of the graph being logged,
and again all calls counted.

The most important improvement made in the experiment is that no computed is
ever publishing values out of sync with its dependencies. As you can see from
the complex example below, knockout publishes many values where both "foo" and
"bar" are present, while the change propagates through the graph. In the
experiment, if a dependency for a computed is not up to date, it will wait to
evaluate. This is all done synchronously within the same stack frame. No more
rateLimit: 0!

## Output from examples

```
$ node simpleExample.js

*** KNOCKOUT SUBSCRIBING ***
calls = 2
*** KNOCKOUT UPDATING ***
value = barfoobc
value = barbarbc
calls = 3
*** EXPERIMENT UPDATING ***
value = foofoobc
calls = 2
*** EXPERIMENT UPDATING ***
value = barbarbc
calls = 2
```

```
$ node complexExample.js

*** KNOCKOUT SUBSCRIBING ***
calls = 8
*** KNOCKOUT UPDATING ***
value = barfoocfooefoofgfoobfoocdhfoobfoof
value = barbarcfooefoofgfoobfoocdhfoobfoof
value = barbarcfooefoofgfoobbarcdhfoobfoof
value = barbarcbarefoofgfoobbarcdhfoobfoof
value = barbarcbarebarfgfoobbarcdhfoobbarf
value = barbarcbarebarfgbarbbarcdhbarbbarf
calls = 21
*** EXPERIMENT UPDATING ***
value = foofoocfooefoofgfoobfoocdhfoobfoof
calls = 8
*** EXPERIMENT UPDATING ***
value = barbarcbarebarfgbarbbarcdhbarbbarf
calls = 8
```

