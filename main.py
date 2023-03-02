from app.controller import create_app

mode = 'development'
# mode = 'production'

app = create_app(mode)

if __name__ == '__main__':
    if mode == 'development':
        print(app.url_map)
        app.run(host='0.0.0.0', port=80)
    elif mode == 'production':
        pass
