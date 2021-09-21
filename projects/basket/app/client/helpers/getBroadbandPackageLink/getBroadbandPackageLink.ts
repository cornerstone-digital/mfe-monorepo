const getBroadbandPackageLink = (isBusiness?: boolean, includeSelectPlan?: boolean) => {
  if (includeSelectPlan) {
    return isBusiness ? `/business/business-connectivity/select-broadband-plan` : `/broadband/deals/select-plan`
  } else {
    return isBusiness ? `/business/business-connectivity/broadband-and-phone` : `/broadband`
  }
}

export default getBroadbandPackageLink
