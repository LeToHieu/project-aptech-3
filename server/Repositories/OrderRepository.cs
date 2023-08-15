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
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Linq;

namespace MediaWebApi.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MediaContext _context;

        public OrderRepository(MediaContext context)
        {
            _context = context;
        }
        public async Task<Orders?> AddOrder(OrderViewModelWithoutId order)
        {
            string sql = "EXECUTE InsertOrder @user_id, @order_date, @total_amount";
            IEnumerable<Orders> result = await _context.Orders.FromSqlRaw(sql,
                new SqlParameter("@user_id", order.userId),
                new SqlParameter("@order_date", order.orderDate),
                new SqlParameter("@total_amount", order.total_amount)
           ).ToListAsync();

            Orders? newOrder = result.FirstOrDefault();
            return newOrder;
        }

        public async Task<List<Orders?>?> GetAllOrder()
        { 
            return await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Order_Detail)
                .ThenInclude(od => od.Album) 
                .Include(o => o.Order_Detail)
                .ThenInclude(od => od.Media) 
                .ToListAsync();
        }
        public async Task<Orders?> GetOrderById(int id)
        {
            Orders? order = await _context.Orders
                .Include(o => o.Order_Detail)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                throw new ArgumentException("Order not found");
            }

            return order;
        }
        public async Task<List<Orders?>>? GetOrderByUserId(int id)
        {
            string sql = "EXEC GetOrderByUserId @user_id";
            List<Orders?>? result = await _context.Orders.FromSqlRaw(sql,
                new SqlParameter("@user_id", id)
                ).ToListAsync();
            return result;
        }
        public async Task<bool?> UpdateOrder(OrderViewModel order)
        {
            string sql = "EXECUTE UpdateOrder @order_id, @total_amount";
            int affectedRows = await _context.Database.ExecuteSqlRawAsync(sql,
                new SqlParameter("@order_id", order.Id),
                new SqlParameter("@total_amount", order.total_amount)
            );

            if (affectedRows == 0)
            {
                throw new ArgumentException("Can not update order");
            }

            return true;
        }
        public async Task<bool?> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return false;
            }
            _context.Orders.Remove(order);

            var orderDetails = await _context.Order_Detail.Where(od => od.OrderId == id).ToListAsync();
            _context.Order_Detail.RemoveRange(orderDetails);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
