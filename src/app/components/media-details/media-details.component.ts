import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cast, Details, Genre } from 'src/app/models/media-details';
import { MediaDetailsService } from 'src/app/services/media-details/media-details.service';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss']
})
export class MediaDetailsComponent implements OnInit{

  constructor(protected mediaDetailsService: MediaDetailsService, private route: ActivatedRoute){}

  videoKey: string = ''
  mediaDetails?: Details
  genres?: Array<Genre> = []
  cast?: Array<Cast> = []

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params => {
      const id = params['id']
      this.getTrailer(id)
      this.getMediaDetails(id)
    },
      error: err => console.log(err)
    })
  }

  getTrailer = (id: any) => {
    this.mediaDetailsService.getTrailer(id).subscribe({
      next: (data: any) => {
        const officialTrailerVideo = data.results.find((video: any) => video.name === "Official Trailer");
        if (officialTrailerVideo) {
          this.videoKey = officialTrailerVideo.key;
        }
      }
    })
  }

  getMediaDetails = (id: any) => {
    this.mediaDetailsService.getDetails(id).subscribe({
      next: (data: any) => {
        this.mediaDetails = data
        const findGenre = data.genres.map((genres:Genre) => genres.name)
        if (findGenre) {
          this.genres = findGenre
        }
        const findCast = data.credits.cast.filter((cast:Cast) => cast.known_for_department === 'Acting').slice(0, 10)
        if (findCast) {
          this.cast = findCast
          console.log(this.cast)
        }
      }
    })
  }

}
