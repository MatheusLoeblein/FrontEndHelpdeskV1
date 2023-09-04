import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import {useFormContext} from 'react-hook-form'

const people = [
  { id: 1, name: 'Baixa' },
  { id: 2, name: 'Moderada' },
  { id: 3, name: 'Alta' },
  { id: 4, name: 'Urgente' },
]

export function DropDownSelect({name, objects, width}) {
  const [selected, setSelected] = useState(objects[0])
  const [query, setQuery] = useState('')

  const {register} = useFormContext()

  let selection = selected.name;

  useEffect(() => {
    selection = selected.name
  },[selected])

  const filteredPeople =
    query === ''
      ? objects
      : objects.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="">
      <Combobox value={selected} onChange={setSelected}
      
      >
        <div className={`relative mt-1 w-${width}`}>
          <div className="relative w-full text-sm border border-border-default cursor-default overflow-hidden rounded-md bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none "
              displayValue={(person) => person.name}
              {...register(name, {
                onChange: (event) => setQuery(event.target.value)
              })}
              
              
            />
            <input type="text"
            value={selection}
            className='hidden'
            {...register(name)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute max-h-60 overflow-y-scroll w-full  border border-border-default rounded-md z-10 bg-whitetext-sm shadow-lg ring-opacity-5 focus:outline-none">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-pointer  select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-300 text-primary-formedica' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-primary-formedica' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
