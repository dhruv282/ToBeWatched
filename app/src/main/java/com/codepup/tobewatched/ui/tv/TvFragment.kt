package com.codepup.tobewatched.ui.tv

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.codepup.tobewatched.AddMovie
import com.codepup.tobewatched.AddTv
import com.codepup.tobewatched.R
import com.google.android.material.floatingactionbutton.FloatingActionButton

class TvFragment : Fragment() {

    private lateinit var tvViewModel: TvViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        tvViewModel =
                ViewModelProviders.of(this).get(TvViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_tv, container, false)
        val textView: TextView = root.findViewById(R.id.text_tv)
        tvViewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })

        root.findViewById<FloatingActionButton>(R.id.add_tv).setOnClickListener {
            val intent = Intent(context, AddTv::class.java)
            startActivity(intent)
        }

        return root
    }
}