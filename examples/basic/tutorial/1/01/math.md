### Math
Some basic math.

Addition:
`1 + 1 == 2`

Subtraction:
`2 - 1 == 1`

+ This test should pass automatically.
@test('1/01/01-add')
@action(open('math.py'))
@action(set('# add'))

+ This test should also pass automatically
@test('1/01/02-subtract')
@action(insert('# subtract'))

+ Set a variable `a` to 1
@test('1/01/03-value')
@action(insert('# value'))
