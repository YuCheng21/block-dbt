from app.controller import create_app


app, settings = create_app()

if __name__ == '__main__':
    if settings.mode == 'development':
        print(app.url_map)
        app.run(host=settings.app_host, port=settings.app_http_port)
    elif settings.mode == 'production':
        from waitress import serve
        serve(app, host=settings.app_host, port=settings.app_https_port, url_scheme='https')
