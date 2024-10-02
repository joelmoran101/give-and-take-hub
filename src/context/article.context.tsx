import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import maxios from '../utilities/maxios'

export type Article={
  _id: string,
  userId: string,
  article_id: number,
  picture_url: string,
  article_name: string,
  article_category: string,
  article_description: string,
  username: string,
  date_time_stamp: string,
  status: string,
  location: string
}
// are used to decribe methods of an object; while type is used to describe any type of data
interface IArticleContext {
    articles: Article[] | null,
    setArticles: React.Dispatch<React.SetStateAction<Article[] | null>>
    getArticle: (articleId: string) => Article | null
}

export const ArticleContext = createContext<IArticleContext>({articles: null, setArticles: () => {}, getArticle: () => null})

const data = [{
    "_id": {
      "$oid": "66e4019a244ca7471f5671e3"
    },
    "article_id": 1,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726302941/Give%20and%20Take%20Article%20Images/wodqbxoqmejyqcd92dyp.png",
    "article_name": "Bluetooth Headphones",
    "article_category": "Electronic Gadgets",
    "article_description": "Over-ear wireless Bluetooth headphones with noise cancellation.",
    "username": "techie123",
    "date_time_stamp": "2024-09-12T14:30:00Z",
    "status": "available",
    "location": "New York, NY"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671e4"
    },
    "article_id": 2,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726304075/Give%20and%20Take%20Article%20Images/zh430lspb2aerwnjsjku.png",
    "article_name": "Wooden Coffee Table",
    "article_category": "Furniture",
    "article_description": "Solid oak coffee table with a classic design.",
    "username": "homeowner98",
    "date_time_stamp": "2024-09-10T08:45:00Z",
    "status": "reserved",
    "location": "Los Angeles, CA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671e5"
    },
    "article_id": 3,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305150/Give%20and%20Take%20Article%20Images/sftjzjm6u3xvbajabemp.png",
    "article_name": "Children's Puzzle Set",
    "article_category": "Toys",
    "article_description": "Colorful puzzle set for kids aged 3-5.",
    "username": "mommy2020",
    "date_time_stamp": "2024-09-11T11:20:00Z",
    "status": "available",
    "location": "Chicago, IL"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671e6"
    },
    "article_id": 4,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305287/Give%20and%20Take%20Article%20Images/ribfowvcjyupz8eadovb.png",
    "article_name": "Leather Jacket",
    "article_category": "Clothes",
    "article_description": "Black leather jacket, size M.",
    "username": "fashionista89",
    "date_time_stamp": "2024-09-09T16:00:00Z",
    "status": "needed",
    "location": "San Francisco, CA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671e7"
    },
    "article_id": 5,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305389/Give%20and%20Take%20Article%20Images/xvjdnabu5l4zhyqsjsbx.png",
    "article_name": "Camping Tent",
    "article_category": "Toys",
    "article_description": "4-person camping tent with waterproof cover.",
    "username": "outdoorlover",
    "date_time_stamp": "2024-09-08T19:00:00Z",
    "status": "already taken",
    "location": "Seattle, WA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671e8"
    },
    "article_id": 6,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305499/Give%20and%20Take%20Article%20Images/bhux5f4wzmomo9oe2cnq.png",
    "article_name": "Electric Drill",
    "article_category": "Electronic Gadgets",
    "article_description": "Cordless electric drill with 2 batteries.",
    "username": "handyman101",
    "date_time_stamp": "2024-09-12T10:10:00Z",
    "status": "available",
    "location": "Austin, TX"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671e9"
    },
    "article_id": 7,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305601/Give%20and%20Take%20Article%20Images/ghgc9wubo8oxsg5brv9e.png",
    "article_name": "Novelty Lamp",
    "article_category": "Electronic Gadgets",
    "article_description": "Retro novelty lamp with adjustable brightness.",
    "username": "interiordecor",
    "date_time_stamp": "2024-09-11T15:30:00Z",
    "status": "reserved",
    "location": "Miami, FL"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671ea"
    },
    "article_id": 8,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305695/Give%20and%20Take%20Article%20Images/n1w6x9t4ng3es01iyevn.png",
    "article_name": "Gaming Console",
    "article_category": "Electronic Gadgets",
    "article_description": "Latest model gaming console with 2 controllers.",
    "username": "gamer4life",
    "date_time_stamp": "2024-09-13T09:00:00Z",
    "status": "available",
    "location": "Philadelphia, PA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671eb"
    },
    "article_id": 9,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305780/Give%20and%20Take%20Article%20Images/n8qljcnj0dmk0nzvnqso.png",
    "article_name": "Winter Coat",
    "article_category": "Clothes",
    "article_description": "Heavy-duty winter coat, size L.",
    "username": "coldweatherwear",
    "date_time_stamp": "2024-09-10T12:00:00Z",
    "status": "needed",
    "location": "Boston, MA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671ec"
    },
    "article_id": 10,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305867/Give%20and%20Take%20Article%20Images/hzgmpaagnhmx8gsvcww8.png",
    "article_name": "Yoga Mat",
    "article_category": "Health & Leisure",
    "article_description": "Non-slip yoga mat with carrying strap.",
    "username": "fitfam",
    "date_time_stamp": "2024-09-08T13:45:00Z",
    "status": "already taken",
    "location": "Denver, CO"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671ed"
    },
    "article_id": 11,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726305987/Give%20and%20Take%20Article%20Images/ytwljm7n28oar5tzzdpn.png",
    "article_name": "Wristwatch",
    "article_category": "Accessories",
    "article_description": "Analog wristwatch with leather strap.",
    "username": "watchlover",
    "date_time_stamp": "2024-09-13T17:00:00Z",
    "status": "available",
    "location": "San Diego, CA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671ee"
    },
    "article_id": 12,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726306129/Give%20and%20Take%20Article%20Images/waons4cqbvn1pijqxu8m.png",
    "article_name": "Portable Blender",
    "article_category": "Electronic Gadgets",
    "article_description": "Battery-operated portable blender for smoothies.",
    "username": "healthydrinks",
    "date_time_stamp": "2024-09-09T14:15:00Z",
    "status": "reserved",
    "location": "Atlanta, GA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671ef"
    },
    "article_id": 13,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726306218/Give%20and%20Take%20Article%20Images/nkqrprfiql6ecgssjnt7.png",
    "article_name": "Table Lamp",
    "article_category": "Furniture",
    "article_description": "Modern table lamp with adjustable shade.",
    "username": "decorator123",
    "date_time_stamp": "2024-09-11T20:00:00Z",
    "status": "needed",
    "location": "Seattle, WA"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671f0"
    },
    "article_id": 14,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726306318/Give%20and%20Take%20Article%20Images/hf4xz9p1vjiuwqmpb0md.png",
    "article_name": "Set of Cookware",
    "article_category": "Kitchen Items",
    "article_description": "Non-stick cookware set including pots and pans.",
    "username": "chef2be",
    "date_time_stamp": "2024-09-10T11:30:00Z",
    "status": "available",
    "location": "Houston, TX"
  },
  {
    "_id": {
      "$oid": "66e4019a244ca7471f5671f1"
    },
    "article_id": 15,
    "picture_url": "https://res.cloudinary.com/dctjnykyl/image/upload/v1726306650/Give%20and%20Take%20Article%20Images/yhbkqjp6xipojh0qvl2p.png",
    "article_name": "Office Chair",
    "article_category": "Furniture",
    "article_description": "Ergonomic office chair with lumbar support.",
    "username": "workspaceguru",
    "date_time_stamp": "2024-09-12T09:45:00Z",
    "status": "Already Taken",
    "location": "Charlotte, NC"
  }]

function ArticleProvider({ children }:{children: React.ReactNode}) {
    const [articles, setArticles] = useState<Article[] | null>(null)

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_HOST + '/api/articles')
        // the following line is just to mock the DB 
        // maxios.get('success', data)      
        .then((response: {data: any}) => {
            setArticles(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        console.log("ARTICLES FETCHED FROM:::", articles)
    }, [articles])

    const getArticle = (articleId: string) => {
        return articles?.find(article => article._id === articleId) || null
    }

    return (
        <ArticleContext.Provider value={{ articles, setArticles, getArticle }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider