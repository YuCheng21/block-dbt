export let endpoint = {
    'exp': {
        'parent': {
            'obj4sub': 'exp.parent.obj4sub',
            'obj4run': 'exp.parent.obj4run',
            'sign_up': 'exp.parent.sign_up',
            'start4sub': 'exp.parent.start4sub',
            'build': 'exp.parent.build',
            'exp2sub': 'exp.parent.exp2sub',
            'build2auth': 'exp.parent.build2auth',
            'run2finish': 'exp.parent.run2finish',
            'update4build': 'exp.parent.update4build',
            'index': 'exp.parent.index'
        },
        'private': {
            'show': 'exp.private.show',
            'form4run': 'exp.private.form4run',
            'scan4run': 'exp.private.scan4run',
            'index': 'exp.private.index'
        },
        'public': {'index': 'exp.public.index', 'show': 'exp.public.show'}
    },
    'oauth': {
        'authenticate': 'oauth.authenticate',
        'auth': 'oauth.auth',
        'index': 'oauth.index',
        'store': 'oauth.store'
    },
    'plain_text': 'plain_text',
    'user': {
        'login': 'user.login',
        'logout': 'user.logout',
        'sign_up': 'user.sign_up',
    }
}
