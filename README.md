# PyTest CodeRoad

PyTest Python test runner for Atom-CodeRoad.

### Setup

Install Python

    pip install -U pytest
    pip install tap.py


### Writing Tests

There are two parts your tests will need: a task number and a feedback message.

##### Task number

Class title specifying the task number: `class Test##`

      class Test01:
        # tests here

      class Test02:
        # tests here

##### Feedback message

Test method providing the feedback message and starting with `test_`

      class Test01:
        def test_b_is_not_true(self):
          assert b == True
          # fails with message "b is not true"

        def test_a_is_not_one(self):
          assert a == 1
          # fails with message "a is not one"
