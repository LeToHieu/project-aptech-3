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
            return await _context.Order_Detail.ToListAsync();
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
            string sql = "EXECUTE InsertOrderDetail @order_id, @album_id, @media_id, @status_order, @price";
            IEnumerable<Order_Detail> result = await _context.Order_Detail.FromSqlRaw(sql,
                    new SqlParameter("@order_id", order_detail.order_id),
                    new SqlParameter("@album_id", order_detail.album_id),
                    new SqlParameter("@media_id", order_detail.media_id),
                    new SqlParameter("@status_order", order_detail.status_order),
                    new SqlParameter("@price", order_detail.price)

            ).ToListAsync();
            Order_Detail? newOrder = result.FirstOrDefault();

            return newOrder;
        }
        public async Task<bool?> UpdateOrder_Detail(Order_DetailViewModel order_detail)
        {
            string sql = "EXECUTE UpdateOrderDetail @Id, @order_id, @album_id, @media_id, @status_order, @price";
            IEnumerable<Order_Detail> result = await _context.Order_Detail.FromSqlRaw(sql,
                    new SqlParameter("@Id", order_detail.Id),
                    new SqlParameter("@order_id", order_detail.order_id),
                    new SqlParameter("@album_id", order_detail.album_id),
                    new SqlParameter("@media_id", order_detail.media_id),
                    new SqlParameter("@status_order", order_detail.status_order),
                    new SqlParameter("@price", order_detail.price)
                                ).ToListAsync();
            Order_Detail? updateOrder = result.FirstOrDefault();
            if (updateOrder == null)
            {
                throw new ArgumentException("Can not update order");
            }
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
