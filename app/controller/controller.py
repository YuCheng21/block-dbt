from sys import _getframe


class MyController:
    def add_decorator(self, decorator):
        self_name = _getframe().f_code.co_name  # add_decorator
        for attribute in dir(self):
            attribute_value = getattr(self, attribute)
            if attribute.startswith('__') is False and attribute != self_name:
                if callable(attribute_value) is True:
                    setattr(self, attribute, decorator(attribute_value))
                else:
                    getattr(attribute_value, self_name)(decorator)
