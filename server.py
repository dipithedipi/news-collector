from flask import Flask, request, jsonify
from random import randint
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

api_key = "your api key"


response_cache = {}

@app.route('/latest_headlines', methods=['GET'])
def get_latest_headlines():
    topic = request.args.get('topic')
    countries = request.args.getlist('countries')
    page = request.args.getlist('page')
    lang = request.args.getlist('lang')
    page_size = request.args.getlist('page_size')

    cache_key = f'{topic}-{",".join(countries)}-{",".join(lang)}{",".join(page)}-'

    if cache_key in response_cache:
        print("from cache\n")
        return jsonify(response_cache[cache_key])

    url = 'https://api.newscatcherapi.com/v2/latest_headlines'
    params = {
        'topic': topic,
        'countries': ','.join(countries),
        'lang': ','.join(lang),
        'page': ','.join(page),
        'page_size': ','.join(page_size),
    }
    headers = {
        'x-api-key': api_key,
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        news_data = response.json()

        response_cache[cache_key] = news_data
        print("new request done")
        print(news_data)
        return jsonify(news_data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Errore nella richiesta delle ultime notizie'})

@app.route('/search', methods=['GET'])
def search_news():
    lang = request.args.getlist('lang')
    search_query = request.args.get('q')
    page = request.args.getlist('page')

    cache_key = f'search--{",".join(lang)}-{search_query}-{page}'

    if cache_key in response_cache:
        return jsonify(response_cache[cache_key])

    url = 'https://api.newscatcherapi.com/v2/search'
    params = {
        'lang': ','.join(lang),
        'q': search_query,
        'page': search_query,
    }
    headers = {
        'x-api-key': api_key,
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()  
        news_data = response.json()

        response_cache[cache_key] = news_data

        return jsonify(news_data) 
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Errore nella ricerca delle notizie'})


if __name__ == '__main__':
    app.run()
