import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function Modal({ dispatchersList, openModal, handleCloseModal, addParcelDetails }) {

    const [deliveryBoy, setDeliveryBoy] = useState('');
    const [senderLocation, setSenderLocation] = useState('');
    const [receiverLocation, setReceiverLocation] = useState('');

      const handleSubmit = () => {
        let date = new Date(Date.now());
        
        var deliveryBoyName = '';
        dispatchersList.forEach( elem => {
            if(elem.value === deliveryBoy ){
                deliveryBoyName = elem.label;
            }
        })
        
        let dataToAdd = {
          consignee: deliveryBoyName,
          consignee_id: deliveryBoy,
            track: [
                {
                    status: 'Parcel Added',
                    date: date.toLocaleString()
                }
            ],
            senderLocation,
            receiverLocation
        }
        addParcelDetails(dataToAdd)
      }

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Parcel Details
                      </Dialog.Title>
                      <div className="mt-5 flex flex-row gap-3">
                        <TextField
                        id="Delivery-boy"
                        select
                        label="Delivery Boy"
                        value={deliveryBoy}
                        onChange={(e) => setDeliveryBoy(e.target.value)}
                        fullWidth
                        >
                            {dispatchersList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField value={senderLocation} onChange={(e) => setSenderLocation(e.target.value)} id="Deliver-from" label="Deliver from" variant="outlined" fullWidth />
                        <TextField value={receiverLocation} onChange={(e) => setReceiverLocation(e.target.value)} id="Deliver-to" label="Deliver to" variant="outlined" fullWidth />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
