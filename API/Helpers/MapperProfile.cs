using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductToReturnDto>()
                      .ForMember(dest => dest.ProductBrand, source => source.MapFrom(m => m.ProductBrand.Name))
                      .ForMember(dest => dest.ProductType, source => source.MapFrom(m => m.ProductType.Name))
                      .ForMember(dest => dest.PictureUrl, source => source.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>().ReverseMap();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                     .ForMember(dest => dest.DeliveryMethod, source => source.MapFrom(m => m.DeliveryMethod.ShortName))
                     .ForMember(dest => dest.ShippingPrice, source => source.MapFrom(m => m.DeliveryMethod.Price));

            CreateMap<OrderItem, OrderItemDto>()
                  .ForMember(dest => dest.ProductId, source => source.MapFrom(m => m.itemOrdered.ProductItemId))
                  .ForMember(dest => dest.ProductName, source => source.MapFrom(m => m.itemOrdered.ProductName))
                  //.ForMember(dest => dest.PictureUrl, source => source.MapFrom(m => m.itemOrdered.PictureUrl))
                  .ForMember(dest => dest.PictureUrl, source => source.MapFrom<OrderItemUrlResolver>());
        }
    }
}
