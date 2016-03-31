# PyTest CodeRoad

PyTest Python test runner for Atom-CodeRoad.

### Setup

Install Python

    pip install -U pytest
    pip install tap.py


### Writing Tests

There are two things your tests will need.

* a `class Test##` specifying the task number

      class TestO1:

      class Test02:

* a test method providing the feedback message and starting with `test_`

      class Test01:
        def test_b_is_not_True(self):
          assert b == True
        def test_a_is_not_one(self):
          assert a == 1
