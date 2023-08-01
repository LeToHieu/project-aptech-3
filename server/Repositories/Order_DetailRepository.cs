using MediaWebApi.Models;
using MediaWebApi.Repositories.Interface;
using MediaWebApi.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MediaWebApi.Repositories
{
    public class Order_DetailRepository:IOrder_DetailRepository
    {
        private readonly MediaContext _context;
        public Order_DetailRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<List<Order_Detail?>?> GetAllOrder_Detail()
        {
            List<Order_Detail?>? order_Details = await _context.Order_Detail
                .Select(o => new Order_Detail()
                {
                    OrderId = o.OrderId == null ? 0 : o.OrderId,
                    MediaId = o.MediaId == null ? 0 : o.MediaId,
                    AlbumId = o.AlbumId == null ? 0 : o.AlbumId,
                    price = o.price == null ? 0 : o.price,
                    Order = o.Order,
                    Album = o.Album,
                    Media = o.Media
                })
                .ToListAsync();

            return order_Details;
        }
        public async Task<Order_Detail?> GetOrder_DetailById(int id)
        {
            Order_Detail? order = await _context.Order_Detail.FindAsync(id);
            if (order == null)
            {
                throw new ArgumentException("Order not found");

            }
            return order;
        }
        public async Task<Order_Detail?> AddOrder_Detail(Order_DetailViewModel order_detail)
        {
            string sql = "EXECUTE InsertOrderDetail @order_id, @album_id, @media_id, @price";
            IEnumerable<Order_Detail> result = await _context.Order_Detail.FromSqlRaw(sql,
                    new SqlParameter("@order_id", order_detail.OrderId),
                    new SqlParameter("@album_id", order_detail.AlbumId),
                    new SqlParameter("@media_id", order_detail.MediaId == 0 ? DBNull.Value : order_detail.MediaId),
                    new SqlParameter("@price", order_detail.Price)

            ).ToListAsync();
            Order_Detail? newOrder = result.FirstOrDefault();

            return newOrder;
        }
        public async Task<bool?> UpdateOrder_Detail(Order_DetailViewModel order_detail)
        {
            //string sql = "EXECUTE UpdateOrderDetail @Id, @order_id, @album_id, @media_id, @price";
            //IEnumerable<Order_Detail> result = await _context.Order_Detail.FromSqlRaw(sql,
            //        new SqlParameter("@Id", order_detail.Id),
            //        new SqlParameter("@order_id", order_detail.order_id),
            //        new SqlParameter("@album_id", order_detail.album_id),
            //        new SqlParameter("@media_id", order_detail.media_id),

            //        new SqlParameter("@price", order_detail.price)
            //                    ).ToListAsync();
            //Order_Detail? updateOrder = result.FirstOrDefault();
            //if (updateOrder == null)
            //{
            //    throw new ArgumentException("Can not update order");
            //}
            return true;
        }
        public async Task<bool?> DeleteOrder_Detail(int id)
        {
            var order = await _context.Order_Detail.FindAsync(id);

            if (order == null)
            {
                return false;
            }
            _context.Order_Detail.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
