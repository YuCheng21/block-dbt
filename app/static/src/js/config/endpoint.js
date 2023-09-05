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
            'store4build': 'exp.parent.store4build',
            'destroy4build': 'exp.parent.destroy4build',
            'index': 'exp.parent.index'
        },
        'private': {
            // 'show': 'exp.private.show',
            'experiment': 'exp.private.experiment',
            'subject': 'exp.private.subject',
            'running': 'exp.private.running',
            'form4run': 'exp.private.form4run',
            'scan4run': 'exp.private.scan4run',
            'index': 'exp.private.index'
        },
        'public': {
            'index': ['exp.public.index', 'exp.index', 'index'],
            // 'show': 'exp.public.show',
            'build': 'exp.public.build',
            'auth': 'exp.public.auth',
            'experiment': 'exp.public.experiment',
            'subject': 'exp.public.subject',
            'running': 'exp.public.running',
            'finish': 'exp.public.finish',
        }
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
