set -eux
function stack_output {
  local stack=$1
  local output_name=$2
  aws cloudformation describe-stacks --region ap-southeast-1 --stack-name $stack \
    | jq -r ".Stacks[0].Outputs | map(select(.OutputKey == \"$output_name\")) | .[0].OutputValue"
}

function assume_role {
  local deployment_role_arn=$1
  local output_profile=$2
  aws sts assume-role \
    --region ap-southeast-1 \
    --role-arn $deployment_role_arn \
    --role-session-name "$output_profile-session"
}