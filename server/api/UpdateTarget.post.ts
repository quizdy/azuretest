import fs from 'fs'
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const VENUES_PATH = "../../public/venues"
const IMAGES_PATH = '../../public/images'

export default defineEventHandler(async(e) => {
  const body = await readBody(e)
  const venue = body.venue as string
  const target = body.target as any

  const venuesPath = path.join(__dirname, VENUES_PATH)
  if (!fs.existsSync(venuesPath)) {
    return {
      msg: 'no exist venues'
    }
  }

  const venuePath = path.join(__dirname, VENUES_PATH, venue + '.json')

  if (!fs.existsSync(venuePath)) {
    return {
      msg: 'no exist venue'
    }
  }
  
  const json = JSON.parse(fs.readFileSync(venuePath, 'utf-8'))
  let pos = json.targets.findIndex((t: any) => t.no === target.no)

  if (pos < 0) {
    const t = {
      no: json.targets.length === 0 ? 1 : json.targets[json.targets.length - 1].no + 1,
      title: target.title,
      lat: target.lat,
      lng: target.lng,
      image: target.image,
      comments: target.comments  
    }
    pos = json.targets.length
    json.targets.push(t)
  }
  else {
    json.targets[pos].title = target.title
    json.targets[pos].lat = target.lat
    json.targets[pos].lng = target.lng
    json.targets[pos].image = target.image
    json.targets[pos].comments = target.comments
  }

  json.targets[pos].image = writeImage(venue, target.title, target.base64)

  if (!json.targets[pos].image) {
    return {
      ret: false,
      msg: 'failed to write image'
    }
  }

  try {
    fs.writeFileSync(venuePath, JSON.stringify(json, null, 2))
  } catch (e) {
    return {
      ret: false,
      msg: JSON.stringify(e)
    }
  }

  return {
    ret: true,
    msg: 'success'
  }
})


/**
 * Write Image
 * @param venue 
 * @param title 
 * @param base64 
 * @returns 
 */
const writeImage = (venue: string, title: string, base64: any): string => {
  console.log(venue)
  console.log(title)

  if (!venue || !title || !base64) return ''
  if (base64.startsWith('data:image')) {
    const data = base64.replace(/^data:\w+\/\w+;base64,/, '')
    const decoded = Buffer.from(data, 'base64')
    const ext = base64.toString().slice(base64.indexOf('/') + 1, base64.indexOf(';'))
    const dir = path.join(__dirname, IMAGES_PATH, venue)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    const filePath = path.join(__dirname, IMAGES_PATH, venue, title + '.' + ext)
    console.log(filePath)
    try {
      fs.writeFileSync(filePath, decoded, 'base64')
    } catch (e: any) {
      return JSON.stringify(e)
    }
    return '/images/' + venue + '/' + title + '.' + ext
  }
  else {
    return ''
  }
}
