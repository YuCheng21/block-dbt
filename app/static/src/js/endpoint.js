export let endpoint = {
    'exp': {
        'parent': {
            'add_object': 'exp.parent.add_object',
            'obj_list': 'exp.parent.obj_list',
            'sign_up': 'exp.parent.register',
            'start': 'exp.parent.start',
            'store': 'exp.parent.store',
            'subject': 'exp.parent.subject',
            'submit': 'exp.parent.submit',
            'update': 'exp.parent.update',
            'user': 'exp.parent.user'
        },
        'private': {
            'content': 'exp.private.content',
            'form': 'exp.private.form',
            'join': 'exp.private.join'
        },
        'public': {'index': 'exp.public.index', 'show': 'exp.public.show'}
    },
    'oauth': {
        'authenticate': 'oauth.authenticate',
        'authenticate_id': 'oauth.authenticate_id',
        'index': 'oauth.index',
        'store': 'oauth.store'
    },
    'plain_text': 'plain_text',
    'user': {
        'login': 'user.login',
        'logout': 'user.logout',
        'sign_up': 'user.register',
        'update': 'user.update'
    }
}
