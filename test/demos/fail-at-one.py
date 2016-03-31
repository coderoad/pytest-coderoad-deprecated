a = 1;

class Test01Class:
    def test_passing_one(self):
        assert a == 1

    def test_failing_test(self):
        assert a > 2

class Test02Class:
    def test_passing_two(self):
        assert a == 1

    def test_passing_test(self):
        assert a < 2

class Test03Class:
    def test_passing_three(self):
        assert a == 1

    def test_passing_test(self):
        assert a < 2
