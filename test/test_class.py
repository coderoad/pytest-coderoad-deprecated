class TestClass:
    def passing_test(self):
        x = "this"
        assert 'h' in x

    def failing_test(self):
        x = "hello"
        assert hasattr(x, 'check')
