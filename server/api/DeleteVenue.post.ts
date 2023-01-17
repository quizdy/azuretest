import fs from 'fs';
import path from 'path'
import { createCommonJS } from 'mlly'

const { __dirname } = createCommonJS(import.meta.url)
const VENUES_PATH = "../../public/venues"
const IMAGES_PATH = '../../public/images'

export default defineEventHandler(async(e) => {
  const body = await readBody(e)
  const venue = body.venue as string | undefined

  if (typeof venue === 'undefined') return

  const venuesPath = path.join(__dirname, VENUES_PATH)
  if (!fs.existsSync(venuesPath)) {
    return {
      ret: false,
      msg: 'not found venues'
    }
  }

  const venuePath = path.join(venuesPath, venue + '.json')
  if (fs.existsSync(venuePath)) {
    fs.unlinkSync(venuePath)
  }
  else {
    return {
      ret: false,
      msg: 'not found venue'
    }
  }
  
  const imagesPath = path.join(__dirname, IMAGES_PATH)
  const imageDir = path.join(imagesPath, venue)

  if (fs.existsSync(imageDir)) {
    fs.rmdirSync(imageDir, { recursive: true })
  }

  return {
    ret: true,
    msg: 'success'
  }
})
