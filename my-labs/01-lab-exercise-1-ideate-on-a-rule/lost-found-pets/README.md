# Exercise 1 · Ideate on a rule

Every product has rules hiding inside it: how much something costs, when two things count as a match, what price feels fair. Designers shape those rules too, and Python is a quick way to feel how a rule behaves before anyone builds a screen.

Your project's file already works: press **▶ Run** in the Terminal tab and every expectation holds.

You don't edit the code: ask the AI agent to make every change, in your own words.

## How the file is laid out

1. **Knobs** at the top: the numbers that shape the rule (a price per hour, a day cap, how many points make a match). Read them to understand it.
2. **The rule**: a short function that turns a situation into an answer, plus the one sentence a customer would see.
3. **Six real moments**, each with what your team expects.

## The loop

1. Run it and read the results. Does anything surprise you?
2. Guess what a change will do, then ask the AI agent to make it.
3. Run again. Did the result match your guess? Did an expectation stop holding?
4. Decide: is the new rule better, or was the expectation wrong?
5. Write one line in your notes: idea → what changed → keep or drop.

| Project | File | The rule |
|---|---|---|
| Micro Seguros | `micro_seguros_price.py` | The price for one moment of cover |
| Lost & Found Pets | `lost_found_match.py` | Does a found pet match a lost report? |
| Letting go of furniture | `letting_go_price.py` | A fair asking price |
