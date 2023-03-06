from app.controller import create_app


app, settings = create_app()

if __name__ == '__main__':
    if settings.mode == 'development':
        print(app.url_map)
        app.run(host='0.0.0.0', port=80)
    elif settings.mode == 'production':
        app.run(host='0.0.0.0', port=80)
