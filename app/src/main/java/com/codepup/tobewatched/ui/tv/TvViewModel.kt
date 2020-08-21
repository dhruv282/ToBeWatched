package com.codepup.tobewatched.ui.tv

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class TvViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "No TV Shows in list"
    }
    val text: LiveData<String> = _text
}