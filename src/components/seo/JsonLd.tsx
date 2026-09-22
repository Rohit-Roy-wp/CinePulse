import React from "react";
import { ReviewPost } from "@/lib/types";

interface JsonLdProps {
  review: ReviewPost;
}

export function JsonLd({ review }: JsonLdProps) {
  const movieTitle = review.title.split(":")[0].trim();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    headline: review.title,
    name: review.title,
    description: review.description,
    reviewBody: review.description,
    datePublished: review.date,
    dateModified: review.date,
    author: {
      "@type": "Person",
      name: review.author.name,
      jobTitle: review.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "CinePulse",
      url: "https://cinepulse.blog",
      logo: {
        "@type": "ImageObject",
        url: "https://cinepulse.blog/images/logo.png",
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": review.category === "Web Series" ? "TVSeries" : "Movie",
      name: movieTitle,
      director: {
        "@type": "Person",
        name: review.director,
      },
      actor: review.cast.map((actorName) => ({
        "@type": "Person",
        name: actorName,
      })),
      genre: review.genre,
      image: `https://cinepulse.blog${review.image}`,
      datePublished: review.releaseDate,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
