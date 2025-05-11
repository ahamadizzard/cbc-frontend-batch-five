import { createClient } from '@supabase/supabase-js';

const key = import.meta.env.VITE_SUPABASE_KEY
const url = import.meta.env.VITE_SUPABASE_URL

// Create a single supabase client for interacting with your database
// and storage - this is the connector
const supabase = createClient(url, key)

export default function mediaUpload(file) {

    const mediaUploadPromise = new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject('No file selected');
                return;
            }

            const timeStamp = new Date().getTime();
            const newfileName = timeStamp + file.name;

            supabase.storage
                .from('cbc-images') // The name of the bucket you created in Supabase
                .upload(newfileName, file, { // The name of the file in the bucket
                    cacheControl: '3600', // Cache control for the file
                    upsert: false, // If true, it will overwrite the file if it already exists
                })
                .then(() => {
                    // Check if the upload was successful
                    // Get the public URL of the file
                    const publicUrl = supabase.storage.from('cbc-images').getPublicUrl(newfileName).data.publicUrl;
                    // console.log('File uploaded successfully: ', publicUrl);
                    resolve(publicUrl);
                })
                .catch(
                    (error) => {
                        // console.error('Error uploading file: ', error);
                        reject("Error uploading file: " + error.message);
                    }
                )
        }
    )
    return mediaUploadPromise;
}


