import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { baseAPIUrl } from '../config';

export default function ParcelCard({ parcelId, consignee, receiverLocation, senderLocation, trackStatus, deleteParcel, updateParcel, userRole }) {

    const hanleDeleteParcel = () => {
        axios.post(`${baseAPIUrl}/parcel/delete.php`, JSON.stringify({id: parcelId}))
        .then(function (response) {
            console.log(response);
            deleteParcel(parcelId);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    const handleUpdateTrackStatus = () => {
        let date = new Date(Date.now());
        
        if(trackStatus.length === 2){
            axios.post(`${baseAPIUrl}/parcel_track_history/create.php`, JSON.stringify({parcelId: parcelId, status: 'Delivered', date: date.toLocaleString()}))
            .then(function (response) {
                console.log(response);
                updateParcel({parcelId: parcelId, status: 'Delivered', date: date.toLocaleString()});
            })
            .catch(function (error) {
                console.log(error);
            });
        } else if(trackStatus.length === 1) {
            axios.post(`${baseAPIUrl}/parcel_track_history/create.php`, JSON.stringify({parcelId: parcelId, status: 'Picked Up', date: date.toLocaleString()}))
            .then(function (response) {
                console.log(response);
                updateParcel({parcelId: parcelId, status: 'Picked Up', date: date.toLocaleString()});
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

  return (
    <Card sx={{ minWidth: 275, width: '50%' }} >
        <div className='flex justify-center items-center mt-2 mb-2 sm:mb-0'>
            <span className='mx-1 text-lg font-semibold'> {senderLocation} </span> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg> 
            <span className='mx-1 text-lg font-semibold '> {receiverLocation} </span>
        </div>
        <div className='flex justify-around my-1'>
            <Typography variant='subtitle1' sx={{fontWeight: 600}} color='primary'>Consignee: {consignee}</Typography>
            <CardActions className='flex justify-end' sx={{p:0}}>
                {userRole === 'seller' ? 
                <Button size="small"  color='error' variant='contained' onClick={hanleDeleteParcel}>
                    Delete
                </Button>
                :
                <Button size="small" color={trackStatus.length === 2 ? 'success' : 'warning'} variant='contained' disabled={trackStatus.length === 3} onClick={handleUpdateTrackStatus}>
                    {trackStatus.length === 3 ? 'Delivered' : trackStatus.length === 2 ? 'Mark as delivered' : 'Mark as picked up'}
                </Button>
                }
            </CardActions>
        </div>
        <CardContent>
            <div className="hidden px-4 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-bold">Status</p>
                <p className="mt-1 text-sm font-bold sm:col-span-2 sm:mt-0">Date</p>
            </div>
            <dl>
                {
                    trackStatus.reverse().map((elem, index) => (
                        <div key={index} className={`${index%2 == 0 && 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                            <dt className="text-sm font-medium text-gray-500">
                                {elem.status}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {elem.date}
                            </dd>
                        </div>
                    ))
                }
            </dl>
        </CardContent>
    </Card>
  );
}
