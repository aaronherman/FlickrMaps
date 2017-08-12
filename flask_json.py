import flickrapi
import json
from flask import Flask
from flask import request
from flask import jsonify
import json
import os

api_key = os.environ.get(flickr_key)
api_secret = os.environ.get(flickr_secret)
app = Flask(__name__)
app.debug = True

#########################

flickr = flickrapi.FlickrAPI(api_key, api_secret)
sets = flickr.photosets.getList(user_id='56712263@N04')

#photoLoc = flickr.photos_geo_getLocation(photo_id=9041484157)

@app.route('/', methods=['GET'])  
def index():
  return "done"


@app.route('/coordinates', methods = ['GET'])
def get_lat_lon():
    #43.3741104
    #-91.6836

    givenlat = request.args.get('latitude')
    print(givenlat)
    givenlon = request.args.get('longitude')
    print(givenlon)

    photos = flickr.photos_search(lat=givenlat, lon=givenlon, radius='1', per_page='10')

    json_list = []

    for photo in photos[0]:
        photo_title = photo.attrib['title']
        photoLoc = flickr.photos_geo_getLocation(photo_id=photo.attrib['id'])
        photo_lat = photoLoc[0][0].attrib['latitude']
        photo_lon = photoLoc[0][0].attrib['longitude']

        photoSizes = flickr.photos_getSizes(photo_id=photo.attrib['id'])
        photo_url = photoSizes[0][1].attrib['source']
        photoInfo = flickr.photos_getInfo(photo_id=photo.attrib['id'])
        #print(str(photoInfo))
        photo_author = photoInfo[0][0].attrib['nsid']
        # print(photo_author)

        photoId = photo.attrib['id']

        json_list.append(dict(title = photo_title, lat=photo_lat, lon=photo_lon,url=photo_url, id = photoId, author = photo_author))
        print(json_list)


    return jsonify(json_obj=json_list)


if __name__ == '__main__':
	app.run()



