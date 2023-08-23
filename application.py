from app.controller import create_app


app, settings = create_app()

if __name__ == '__main__':
    if settings.mode == 'development':
        # print(app.my_route())
        app.run(host=settings.app_host, port=settings.app_port)
    elif settings.mode == 'production':
        from waitress import serve
        serve(app, host=settings.app_host, port=settings.app_port, url_scheme='https')
