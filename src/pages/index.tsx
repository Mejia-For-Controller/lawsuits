import { MantineProvider, SegmentedControl } from '@mantine/core';
import Head from 'next/head'
import * as React from 'react';

import Seo from '@/components/Seo';

import lawsuitssource from './csvjson.json';

function titleCase(str: string) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

interface eachrow {
  "DOLLAR AMOUNT": string;
  "DATE": string;
}

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.s

export default function HomePage() {
  const urlexp = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
  const [format, setformat] = React.useState('list');
  const [sortCol, setSortCol] = React.useState('amount');


  const sortElements = (a: any, b: any) => {

    if (sortCol === 'amount') {

      const aAm = parseFloat(a['DOLLAR AMOUNT'].replace(/\$/g, "").replace(/,/g, ""));

      const bAm = parseFloat(b['DOLLAR AMOUNT'].replace(/\$/g, "").replace(/,/g, ""));
      return bAm - aAm;
    }

    if (sortCol === 'date') {

      //sort dates from MM/DD/YYYY format from newest to oldest

      const aDate: number = new Date(a['DATE']).getTime();
      const bDate: number = new Date(b['DATE']).getTime();

      return bDate - aDate;

    }

  };

  return (
    <>
      <Head>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />

      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark'
        }}
      >
        <>


          {/* <Seo templateTitle='Home' /> */}
          < Seo />

          <main className='lexend text-white bg-zinc-900 h-screen overflow-y-auto' style={{
            fontFamily: 'Lexend Deca'
          }}>


            <section className='container mx-auto text-white px-2 ml-auto mr-auto pt-8 pb-5'

              style={{
                fontFamily: 'Lexend Deca'
              }}
            >
              <h1>City of Los Angeles Lawsuits Over $100,000</h1>
              <h3>Made by <a href="https://mejiaforcontroller.com/"
                className='underline'
                style={{
                  color: '#41ffca'
                }}
              >Kenneth Mejia for LA City Controller</a></h3>
            </section>
            <section className="px-2 mx-auto container ml-auto mr-auto">

              <div className='pb-4 flex flex-row '>


                <div className="hidden md:block">
                  <p className=" text-gray-200">Format</p>

                  <SegmentedControl
                    color="green"
                    value={format}
                    onChange={setformat}
                    data={[
                      { label: 'List', value: 'list' },
                      { label: 'Table', value: 'table' }

                    ]}
                  />
                </div>

                <div className=" ">
                  <p className="text-gray-200">Sort</p>

                  <SegmentedControl
                    color="blue"
                    value={sortCol}
                    onChange={setSortCol}
                    data={[
                      { label: 'Amount', value: 'amount' },
                      { label: 'Date', value: 'date' }

                    ]}
                  />

                </div>
              </div>
            </section>
            <section className={` text-white pt-2 ${format === 'list' ? "px-2 mx-auto container ml-auto mr-auto " : "px-2"}`}>



              <div className={`flex flex-col gap-y-2 ${format == "list" ? "" : "md:hidden"}`}>
                {
                  lawsuitssource
                    .filter((item) => {
                      const amount = parseFloat(item['DOLLAR AMOUNT'].replace(/\$/g, "").replace(/,/g, ""));

                      return amount >= 100000
                    })
                    .sort((a: any, b: any) => {
                      return sortElements(a, b)

                    })
                    .map((item, itemkey) => (
                      <div
                        key={itemkey}
                        className="rounded-xl bg-zinc-800 p-4 text-gray-100"
                      >

                        <>
                          <h4 className="text-lg font-bold">{item['Category']}</h4>
                          {item['DATE']}
                          <br />
                          <div className='flex flex-row w-full'>
                            <div>{item['DOLLAR AMOUNT']}</div>
                            <div className="text-right ml-auto">Paid To: <span className='font-bold'>{titleCase(item['VENDOR NAME'])}</span></div>

                          </div>



                          <p className='lexend text-gray-200 font-light'>{item["Description/Notes"]}</p>

                          {item["Supportive Links"].match(urlexp) && (
                            <p className='lexend text-gray-200 font-light'><span className='font-medium'>Links: </span>{


                              item["Supportive Links"].match(urlexp)
                                .map((url, urlkey) => (
                                  <>
                                    <a key={urlkey} href={url} target="_blank" className='underline text-teal-300 hover:text-cyan-400' rel="noreferrer">{url.replace(/http(s)?:\/\//, "")}</a>
                                    {
                                      urlkey != (item["Supportive Links"].match(urlexp).length - 1) && (
                                        <br />
                                      )
                                    }
                                  </>
                                )

                                )
                            }

                            </p>
                          )}

                          <div></div>
                        </>
                      </div>

                    ))
                }
              </div>



              <div className={`w-full ${format == "table" ? "hidden md:block" : "hidden"}`}>
                < table className="table-auto w-full">
                  <thead className='bg-zinc-800'>
                    <th className="border border-gray-600">Category</th>
                    <th className="border border-gray-600">Description</th>
                    <th className="border border-gray-600">Links</th>
                    <th className="border border-gray-600">Date</th>
                    <th className="border border-gray-600">Paid To</th>
                    <th className="border border-gray-600">Amount</th>
                  </thead>
                  <tbody>
                    {
                      lawsuitssource
                        .filter((item) => {
                          const amount = parseFloat(item['DOLLAR AMOUNT'].replace(/\$/g, "").replace(/,/g, ""));

                          return amount >= 100000
                        })
                        .sort(

                          (a: any, b: any) => {
                            return sortElements(a, b)

                          })
                        .map((item, itemkey) => (
                          <>
                            <tr>
                              <td className="align-top border border-gray-500 ">{item['Category']}</td>


                              <td className='align-top border border-gray-500 text-gray-200 font-light'> {item["Description/Notes"]}</td>

                              <td className='align-top border border-gray-500 font-light max-w-sm'> {

                                item["Supportive Links"] && (
                                  item["Supportive Links"].match(urlexp)
                                    .map((url, urlkey) => (
                                      <>
                                        <a key={urlkey} href={url} target="_blank" className='underline text-teal-300 hover:text-cyan-400' rel="noreferrer">{url.replace(/http(s)?:\/\//, "")}</a>
                                        {
                                          urlkey != (item["Supportive Links"].match(urlexp).length - 1) && (
                                            <br />
                                          )
                                        }
                                      </>
                                    )

                                    )
                                )

                              }</td>
                              <td className='align-top border border-gray-500'>{item['DATE']}</td>
                              <td className='align-top border border-gray-500'>{titleCase(item['VENDOR NAME'])}</td>
                              <td className="align-top border border-gray-500">{item['DOLLAR AMOUNT']}</td>
                            </tr>
                          </>

                        ))
                    }
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </>
      </MantineProvider >
    </>
  );
}
