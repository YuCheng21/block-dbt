from functools import partial


async def make_func_async(func, kwargs, loop):
    result = await loop.run_in_executor(None, partial(func, **kwargs))
    return result


def func_with_args(func, kwargs):
    return func, kwargs
