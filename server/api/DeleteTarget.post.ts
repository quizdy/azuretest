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
      ret: false,
      msg: 'no exist venues'
    }
  }

  const venuePath = path.join(__dirname, VENUES_PATH, venue + '.json')

  if (!fs.existsSync(venuePath)) {
    return {
      ret: false,
      msg: 'no exist venue'
    }
  }
  
  const json = JSON.parse(fs.readFileSync(venuePath, 'utf-8'))

  let pos = json.targets.findIndex((t: any) => t.no === target.no)

  if (pos < 0) {
    return {
      ret: false,
      msg: 'no exist target'
    }
  }
  else {
    const imagesPath = path.join(__dirname, IMAGES_PATH)
    const image = path.join(imagesPath, venue, json.targets[pos].image)
    if (fs.existsSync(image)) {
      fs.unlinkSync(image)
    }
    json.targets.splice(pos, 1)
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
