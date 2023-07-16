import React from 'react'
import Card from '../Card/Card'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Video = () => {
  return (
    <div className='flex gap-2 h-full pl-5'>
      <div className="left flex-[3]">
        <div>
          <iframe width="1100" height="550" src="https://www.youtube.com/embed/vainx5HZjzg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          {/* <video src="https://www.youtube.com/embed/vainx5HZjzg" autoPlay controls ></video> */}
        </div>
        <h3 className='my-5 text-[16px] font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum facilis exercitationem eum possimus molestiae excepturi porro inventore nemo numquam expedita voluptas vero cum, libero cupiditate commodi explicabo ipsum eos itaque neque quis sunt! Sapiente repudiandae nobis eius tempore dolor ab ipsum iste accusantium. Incidunt dolorem quas dolorum saepe, voluptate commodi.</h3>
        <div className='flex gap-5 items-center'>
          <img src="https://framerusercontent.com/images/iX7dUlRI1KCdI731guMFo6y3iUw.png?scale-down-to=512"
              className='w-12 h-12 rounded-full'
          />
          <div>
              <p className='text-sm font-semibold mb-1'>Vie Channel </p>
              <p  className='flex items-center gap-1 text-xs'>10.5m Subcribe</p>
          </div>
          <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-black bg-white border-[1px] border-gray-400'>Join</button>
          <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-white bg-black'>Subcribe</button>
        </div>
        <div className="description p-5 bg-neutral-100 rounded-xl">
          <input type="checkbox" name='show-desc' id='show-desc' />
          <span className=' max-h-[100px] overflow-hidden block'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quae qui debitis architecto quibusdam. Reiciendis quis sequi voluptatum cumque optio voluptatem odit porro, iure esse deleniti alias assumenda repellat vero necessitatibus consequuntur ipsum dicta amet eaque ducimus neque incidunt! Porro aperiam fuga consequatur tempora voluptas? Dolorem nihil quas, voluptatum cumque, inventore facere et hic cum at deleniti animi. Sed fugiat sunt, deserunt eaque omnis officia quod accusantium reprehenderit, dolores dicta earum, eos soluta impedit ad expedita repellendus dignissimos id reiciendis. Hic minima, dolorem totam voluptate vel maxime voluptates sapiente sit quaerat fuga ipsa ullam perferendis amet temporibus molestias. Fugit obcaecati eligendi aliquam ex maiores nostrum ab consequuntur exercitationem, provident natus? Magni expedita at accusamus excepturi omnis quaerat non quisquam, architecto recusandae, earum deleniti nostrum blanditiis illum quo, libero voluptatem. Ducimus porro reiciendis consequuntur illo dolore dicta natus ratione doloribus quod voluptatibus eos, architecto exercitationem voluptates ullam eveniet minus ipsa. Rerum expedita asperiores perferendis pariatur amet soluta, id sunt fugit, placeat provident vero, molestias error cumque aut dignissimos quae quas maiores? Amet ducimus, possimus nam aliquam nulla quos ipsam, repellendus accusantium quisquam porro soluta, quae quidem? At consequuntur voluptas nobis. Quisquam id perferendis magnam, veniam doloremque laboriosam assumenda natus sapiente ex ab accusamus eos? Voluptatum, quam tenetur? Rerum aperiam, ad in quaerat soluta modi. Quae sequi perferendis dicta officia repellat delectus ullam nobis numquam nisi, voluptates ut voluptatum fugit! Debitis, atque! Odio et ex maiores maxime? Possimus obcaecati deleniti cumque. Corrupti earum architecto, debitis illum id ea ex possimus reprehenderit voluptatem, delectus aliquam eligendi eius similique! A dolores inventore quidem eligendi, blanditiis asperiores quam ratione. Maxime reprehenderit laborum fugit quae iusto eos nostrum culpa amet ad ipsa mollitia, omnis perspiciatis rem excepturi deleniti fugiat recusandae error asperiores temporibus sint autem! Molestias ducimus atque sint voluptas aperiam libero. Excepturi, nesciunt accusamus nobis illo ullam iure magni eveniet provident alias totam tempora dicta repellat deserunt obcaecati? Molestias enim deleniti necessitatibus. Laudantium quo ut veniam et minus modi alias nihil! Deserunt laborum officiis ab expedita, repellat sunt voluptate alias aliquid, quaerat labore, dolores vitae. Nobis odio assumenda ut, debitis quo quisquam dolor, sapiente ipsam fuga laudantium, laborum beatae minima hic aut earum consectetur aliquam. Eos architecto odit eveniet rem distinctio, minima asperiores! Sint soluta repellat odit quas, iste, perferendis magnam doloribus sed reiciendis corrupti suscipit provident ab ullam commodi accusantium, quae voluptatibus distinctio nam expedita delectus. Est perferendis at similique voluptatibus, animi autem ad nisi saepe aspernatur totam rem odio aliquam quis ea doloribus illo. Illo odit perspiciatis, debitis ea, iste doloremque adipisci quia tempora sed officiis suscipit quidem cumque. Ipsum, ipsam ipsa ullam nihil temporibus et maiores laborum sapiente? Repellendus facilis quasi incidunt, dolorum, reiciendis consequatur reprehenderit asperiores deleniti ratione soluta numquam totam sit modi saepe, aliquid nisi distinctio mollitia deserunt eos voluptatum non? Nostrum minima dolor vitae necessitatibus veniam dolores rerum officiis consequuntur, cupiditate totam repellat aliquid quaerat nobis architecto. Ratione perspiciatis numquam odit laboriosam voluptatibus a ipsum exercitationem fugiat. Eos numquam vel voluptatibus soluta earum cupiditate enim tempora, nam doloremque modi.
          </span>
          <label htmlFor="show-desc" data-more="Show more" data-less="Show less" className='show relative text-center inline-block w-[150px] h-[50px]'>
          </label>
        </div>
        <div className='total mt-5 text-[16px]'>
          <p>1111 Comments</p>
        </div>
        <form action="" className='py-5'>
          <p className='text-sm'>Commenting as</p>
          <div className='flex items-center gap-5 my-2 mb-5'>
            <img src="https://framerusercontent.com/images/iX7dUlRI1KCdI731guMFo6y3iUw.png?scale-down-to=512" className='w-12 h-12 rounded-full' />
            <p>Name</p>
          </div>
          <input type="text" placeholder='Add a comment' className='w-full outline-none' />
          <div className='my-3 text-right'>
            <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-black bg-white shadow-lg  shadow-gray-300'>Cancel</button>
            <button className='ml-5 py-2 px-4 rounded-2xl font-semibold text-sm text-white bg-blue-400 shadow-lg  shadow-blue-500'>Comment</button>
          </div>
        </form>
        <div className="comments">
        <p className='text-sm'>Commenting as</p>
          <div className='flex items-center gap-5 my-2 mb-5'>
            <img src="https://framerusercontent.com/images/iX7dUlRI1KCdI731guMFo6y3iUw.png?scale-down-to=512" className='w-12 h-12 rounded-full mb-auto' />
            <div>
              <p className='text-sm font-semibold flex items-center gap-2'>Name <span className='font-thin text-[12px]'>11 month age</span></p>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum saepe beatae omnis ut praesentium nesciunt quod iste, sunt est numquam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum saepe beatae omnis ut praesentium nesciunt quod iste, sunt est numquam?
              </p>
            </div>
          </div>
        </div>
        <Stack spacing={2}>
          <Pagination count={10} />
          <Pagination count={10} color="primary" />
          <Pagination count={10} color="secondary" />
          <Pagination count={10} disabled />
        </Stack>
      </div>
      <div className="right flex-1">
        <div>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default Video