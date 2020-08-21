package com.codepup.tobewatched

import android.content.Intent
import android.net.Uri.encode
import android.os.Bundle
import android.os.PersistableBundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.AutoCompleteTextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray
import org.json.JSONObject

class AddMovie: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.add_movie)

        findViewById<AutoCompleteTextView>(R.id.search_movies).addTextChangedListener(object: TextWatcher{
            override fun afterTextChanged(s: Editable) {}

            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                if(count >= 2){
                    searchMovies(s.toString())
                }
            }
        })
    }

    private fun searchMovies(searchQuery: String){
        val queue: RequestQueue = Volley.newRequestQueue(this@AddMovie)
        var url = "https://api.themoviedb.org/3/search/movie?api_key=TMDB_API_KEY&query=SEARCH_QUERY&language=en-US&include_adult=false"
        url = url.replace("SEARCH_QUERY", encode(searchQuery))
        url = url.replace("TMDB_API_KEY", BuildConfig.TMDB_API_KEY)
        val jsonObjectRequest = JsonObjectRequest(Request.Method.GET, url, null,
            Response.Listener { response ->

                var movie_results = arrayListOf<media>()
                val results = response.getJSONArray("results")
                for(i in 0 until results.length()) {
                    val movie_item = results.getJSONObject(i)

                    var date = movie_item["release_date"].toString().split("-")

                    var genre_ids = arrayListOf<Int>()
                    val res_genre_ids = movie_item.getJSONArray("genre_ids")
                    for(j in 0 until res_genre_ids.length()) {
                        genre_ids.add(res_genre_ids[j].toString().toInt())
                    }

                    val movie = media(movie_item["original_title"].toString(), date[0].toInt(), movie_item["popularity"].toString().toFloat(),
                    movie_item["vote_count"].toString().toInt(), movie_item["vote_average"].toString().toFloat(), movie_item["original_language"].toString().toUpperCase(),
                    arrayListOf<String>(), genre_ids, movie_item["poster_path"].toString(), movie_item["overview"].toString())

                    movie_results.add(movie)
                    val sorted_movie_results = movie_results.sortedWith(compareBy({it.popularity}))
                }

            },
            Response.ErrorListener { _ ->

            }
        )
        queue.add(jsonObjectRequest)
    }
}